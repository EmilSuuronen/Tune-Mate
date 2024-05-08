export default function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}
