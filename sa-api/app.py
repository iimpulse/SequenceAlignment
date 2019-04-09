#!/usr/bin/python
from flask import Flask
app = Flask(__name__)


@app.route('/align')
def align():
    return "Call Aligner here"

if __name__ == '__main__':
    app.run()
