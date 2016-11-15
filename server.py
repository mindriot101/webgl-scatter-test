#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, jsonify, render_template
import numpy as np

app = Flask(__name__)


@app.route('/data')
def fetch_data():
    arr = np.load('stdcrms.npy')
    stdcrms = arr['stdcrms']
    x = np.arange(stdcrms.size)

    nights = arr['night']
    night_breaks = [(0, nights[0])]
    last_night = nights[0]
    for i, night in enumerate(nights):
        if night != last_night:
            night_breaks.append((i, night))
            last_night = night
    night_breaks.append((len(nights), nights[-1]))

    print(night_breaks)

    return jsonify({
        'data': [x.tolist(), stdcrms.tolist()],
        'nights': night_breaks}
    )


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/example')
def example():
    return render_template('example.html')

if __name__ == '__main__':
    app.run(debug=True)
