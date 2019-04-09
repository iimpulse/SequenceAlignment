#!/usr/bin/python
from flask import Flask, request, jsonify
from .aligner import Aligner

app = Flask(__name__)


@app.route('/align')
def align():
    seq_one = request.args.get('seq1')
    seq_two = request.args.get('seq2')
    match = request.args.get('match')
    mismatch = request.args.get('mismatch')
    gap = request.args.get('gap')
    aligner = Aligner(seq_one, seq_two, match, mismatch, gap)

    return jsonify(aligner.find_optimal_alignments())

if __name__ == '__main__':
    app.run()
