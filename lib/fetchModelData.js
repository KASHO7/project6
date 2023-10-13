function fetchModel(url) {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    resolve({ data: response });
                } catch (error) {
                    reject({ status: xhr.status, statusText: 'JSON parsing error' });
                }
            } else {
                reject({ status: xhr.status, statusText: xhr.statusText });
            }
        };

        xhr.onerror = function () {
            reject({ status: xhr.status, statusText: xhr.statusText });
        };

        xhr.send();
    });
}

export default fetchModel;
