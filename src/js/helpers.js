import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(
                new Error(`Request took too long! Timeout after ${s} seconds`)
            );
        }, s * 1000);
    });
};

export const getJSON = async function (url) {
    try {
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${data.status}) `);
        return data;
    } catch (err) {
        throw err;
    }
};

export const sendJSON = async function (url, uploadData) {
    try {
        const res = await Promise.race([
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/Json',
                },
                body: JSON.stringify(uploadData),
            }),
            timeout(TIMEOUT_SEC),
        ]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${data.status}) `);
        return data;
    } catch (err) {
        throw err;
    }
};
