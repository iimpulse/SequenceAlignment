#!/usr/bin/python
import os
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from .aligner import Aligner

app = Flask(__name__,
static_url_path='',
static_folder='build',
template_folder='build')
CORS(app)

@app.route('/')
def home():
    return render_template("index.html")

@app.route('/align')
def align():
    seq_one = request.args.get('seq1').strip()
    seq_two = request.args.get('seq2').strip()
    match =  int(request.args.get('match'))
    mismatch = int(request.args.get('mismatch'))
    gap = int(request.args.get('gap'))

    aligner = Aligner(seq_one, seq_two, match, mismatch, gap)

    return jsonify(aligner.find_optimal_alignments())

if __name__ == '__main__':
    app.run()
