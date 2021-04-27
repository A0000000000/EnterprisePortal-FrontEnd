import axios from 'axios'

export default class Fegin {
    constructor(url) {
        this.url = url
    }

    requestProxy(name, callback) {
        axios.get(this.url + '/api/service/' + name).
            then(res => {
                const data = res.data
                if (data.code !== 200) {
                    callback(data.message)
                    console.log('微服务不存在.')
                } else {
                    const profix = data.data.url + ':' + data.data.port
                    callback(null, profix)
                }
            })
    }

    async get(name, url, options) {
        return new Promise((resolve, reject) => {
            this.requestProxy(name, (err, profix) => {
                if (err) {
                    reject(err)
                    return
                }
                axios.get(profix + url, options).then(res => resolve(res))
            })
        })
    }

    async post(name, url, params, options) {
        return new Promise((resolve, reject) => {
            this.requestProxy(name, (err, profix) => {
                if (err) {
                    reject(err)
                    return
                }
                axios.post(profix + url, params, options).then(res => resolve(res))
            })
        })
    }

    async put(name, url, params, options) {
        return new Promise((resolve, reject) => {
            this.requestProxy(name, (err, profix) => {
                if (err) {
                    reject(err)
                    return
                }
                axios.put(profix + url, params, options).then(res => resolve(res))
            })
        })
    }

    async delete(name, url, options) {
        return new Promise((resolve, reject) => {
            this.requestProxy(name, (err, profix) => {
                if (err) {
                    reject(err)
                    return
                }
                axios.delete(profix + url, options).then(res => resolve(res))
            })
        })
    }

}
