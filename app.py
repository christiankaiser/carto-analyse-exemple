# coding=utf8

import flask
import psycopg2 as db
import json
from random import choice


# créer une connexion à PostgreSQL: (adapter en fonction de votre base de données!)
conn = db.connect("dbname='carto_analyse_dev' user='ck' host='localhost' password=''")


app = flask.Flask(__name__)
app.debug = True

@app.route('/')
def index():
    return flask.render_template(
        'index.html',
        random=choice(range(1,46))
    )


@app.route('/cantons')
def cantons():
    # obtenir un curseur vers la base de données:
    cur = conn.cursor()
    # exécuter la requête SQL:
    cur.execute("""SELECT id0 AS fid, id1 AS canton,
                       ST_AsGeoJson(ST_Transform(geom, 4326), 7) AS geom
                   FROM k4_cantons_vf""")
    # et demander l'ensemble du résultat de la requête:
    cantons = cur.fetchall()
    # créer la structure des données pour GeoJSON:
    features = []
    for row in cantons:
        features.append({ 
            "type": "Feature", 
            "properties": { "geocode": row[0], "nom": row[1] },
            "geometry": json.loads(row[2])
        })
    feature_collection = {
        "type": "FeatureCollection",
        "features": features
    }
    # retourner le résultat en format JSON:
    return flask.jsonify(feature_collection)


if __name__ == '__main__':
    app.run()
