import flask
from random import choice

app = flask.Flask(__name__)
app.debug = True

@app.route('/')
def index():
    return flask.render_template(
        'index.html',
        random=choice(range(1,46))
    )

if __name__ == '__main__':
    app.run()
