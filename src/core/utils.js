function indexToCoord(id) {
    return {
        x: id % 7,
        y: Math.trunc(id / 7)
    };
}

function coordToIndex({ x, y }) {
    return y * 7 + x;
}
export default indexToCoord;
export { indexToCoord, coordToIndex };
