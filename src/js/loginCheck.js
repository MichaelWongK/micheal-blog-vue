export default {
    checkLogin(show){
        const token = localStorage.getItem("token")
        if (token){
            show.$router.push('/blog/add')
        }else{
            show.$children[0].login =true
        }
    }
}