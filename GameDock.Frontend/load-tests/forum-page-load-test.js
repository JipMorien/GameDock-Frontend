/* global __ENV */

import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
    scenarios: {
        forum_page_load: {
            executor: 'constant-vus',
            vus: 50,
            duration: '1m',
        },
    },
    thresholds: {
        http_req_duration: ['p(95)<2000'],
        http_req_failed: ['rate<0.01'],
    },
}

const FRONTEND_BASE = __ENV.FRONTEND_BASE || 'https://gamedoc.tech'

export default function () {
    const response = http.get(`${FRONTEND_BASE}/forum`)

    check(response, {
        'forum page status is 200': response => response.status === 200,
        'forum page contains FORUM heading': response =>
            response.body.includes('FORUM'),
    })

    sleep(1)
}