export const formatDate = (date: Date) =>
    date
        .toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
        .replace(/(\.| )/g, '');

export const getClosestDate = () => {
    // today is asia/seoul
    const today = new Date(
        new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
    );
    const day = today.getDay();
    if (day === 0) {
        // Sunday, set to next Monday
        today.setDate(today.getDate() + 1);
    } else if (day === 6) {
        // Saturday, set to next Monday
        today.setDate(today.getDate() + 2);
    }
    return today;
};
