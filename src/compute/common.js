/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { scaleBand } from 'd3-scale'

/**
 * Generates indexed scale.
 *
 * @param {Array.<Object>} data
 * @param {Function}       getIndex
 * @param {Array.<number>} range
 * @param {number}         padding
 * @Param {scalePropType}  indexScale
 * @returns {Function}
 */
export const getIndexScale = (data, getIndex, range, padding, indexScale) => {
    return scaleBand()
        .domain(data.map(getIndex))
        .range(range)
        .round(Boolean(indexScale.round))
        .padding(padding)
}

const cloneObject = obj => {
    var clone = {}
    for (var i in obj) {
        if (typeof obj[i] == 'object' && obj[i] != null) clone[i] = cloneObject(obj[i])
        else clone[i] = obj[i]
    }
    return clone
}

export const normalizeData = (data, keys) => {
    const res = []
    for (let entry of data) {
        const copied = cloneObject(entry)
        for (let key of keys) {
            if (!copied.hasOwnProperty(key)) {
                copied[key] = null
            }
        }
        res.push(copied)
    }
    return res
}

export const filterNullValues = data => {
    const res = {}
    const keys = Object.keys(data)
    for (const key of keys) {
        if (data[key]) {
            res[key] = data[key]
        }
    }
    return res
}
