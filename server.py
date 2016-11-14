#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, jsonify, render_template
import numpy as np

app = Flask(__name__)


@app.route('/data')
def fetch_data():
    stdcrms = np.load('stdcrms.npy')
    x = np.arange(stdcrms.size)

    return jsonify({'data': [x.tolist(), stdcrms.tolist()]})


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/example')
def example():
    return render_template('example.html')

if __name__ == '__main__':
    app.run(debug=True)
