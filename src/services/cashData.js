const timeOffset = 60 * 60 * 1000;

const isTimeout = (time) => {
    return (Date.now() - time) > timeOffset;
}

const clearLocalStorage = () => {
    localStorage.clear();
}

setInterval(clearLocalStorage, timeOffset);

const cashData = (key, data) => {
    if (!data) {
        const localStorageData = JSON.parse(localStorage.getItem(key));
        if (localStorageData && localStorageData.data && isTimeout(localStorageData.time)) {

            localStorage.setItem(key, JSON.stringify({ data: localStorageData.data, time: Date.now() }));
            return localStorageData.data;
        }
        return null;
    }


    localStorage.setItem(key, JSON.stringify({ data, time: Date.now() }));
}

export default cashData;
