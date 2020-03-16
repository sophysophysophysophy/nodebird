export default function({ store, redirect}) {
    //로그인한 상태가 아니면 
    if(!store.state.users.me) {
        redirect('/')
    }
}