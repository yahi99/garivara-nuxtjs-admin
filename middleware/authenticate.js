export default function ({redirect, app, store}) {
  const token = app.$cookies.get('accessTokenAdmin')
  if (token == undefined) {
    return redirect('/account/login')
  }
}

