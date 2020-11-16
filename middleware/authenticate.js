export default function ({redirect, app, store}) {
  const token = app.$cookies.get('accessToken')
  if (token == undefined) {
    return redirect('/account/login')
  }
}

