import { TIMEOUT_SEC } from "./config";

const timeout = function (seconds: number) {
    return new Promise<any>(function (_, reject) {
        setTimeout(() => {
            reject(
                new Error(
                    `Request took too long! Timeout after ${seconds} seconds`
                )
            );
        }, seconds * 1000);
    });
};

export const getJson = async function (url: string) {
    try {
        const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status}) * * * *`);
        return data;
    } catch (error) {
        console.log(error);
    }
};
