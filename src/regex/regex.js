const numberregex = /^[a-zA-Z]+$/;
const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const passregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

module.exports ={ numberregex , emailregex ,passregex}