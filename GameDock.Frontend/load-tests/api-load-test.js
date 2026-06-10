/* global __ENV */

import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
    scenarios: {
        api_load: {
            executor: 'constant-vus',
            vus: 50,
            duration: '1m',
        },
    },
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.01'],
    },
}

const API_BASE = __ENV.API_BASE || 'https://api.gamedoc.tech/api'

function login() {
    const response = http.post(
        `${API_BASE}/auth/login`,
        JSON.stringify({
            email: 'test@gmail.com',
            password: 'Password',
        }),
        {
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: '30s',
        }
    )

    check(response, {
        'login status is 200': r => r.status === 200,
    })

    return response.json('token')
}

export default function () {
    const token = login()

    const headers = {
        Authorization: `Bearer ${token}`,
    }

    const postsResponse = http.get(`${API_BASE}/posts`, {
        headers,
        timeout: '30s',
    })

    check(postsResponse, {
        'posts status is 200': r => r.status === 200,
    })

    const profileResponse = http.get(`${API_BASE}/profiles/me`, {
        headers,
        timeout: '30s',
    })

    check(profileResponse, {
        'profile status is 200': r => r.status === 200,
    })

    sleep(1)
}