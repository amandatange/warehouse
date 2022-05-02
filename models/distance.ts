export default function distanceBetweenCoordinates(shipping, gps) {
    const R = 6371e3;
    const φ1 = shipping.latitude * Math.PI/180;
    const φ2 = gps.latitude * Math.PI/180;
    const Δφ = (gps.latitude-shipping.latitude) * Math.PI/180;
    const Δλ = (gps.longitude-shipping.longitude) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c;
    return d;
};
