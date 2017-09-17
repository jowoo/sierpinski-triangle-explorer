export const generatePoints = (p1, p2, p3, r) => {
    if(r == 0) {
        return [[p1, p2, p3]];
    } else {
        let point1 = midPoints(p1, p2);
        let point2 = midPoints(p2, p3);
        let point3 = midPoints(p3, p1);

        return [...generatePoints(p1, point1, point3, r-1), ...generatePoints(point1, p2, point2, r-1), ...generatePoints(point3, point2, p3, r-1)]
    }
}

let midPoints = (_p1, _p2) => {
    let p1 = _p1[0] + (_p2[0] - _p1[0]) * 0.5;
    let p2 = _p1[1] + (_p2[1] - _p1[1]) * 0.5;
    return [p1,p2]
}
