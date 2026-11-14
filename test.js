async function authenticate() {
        // access email and pass values
        const emailVal = email.value
        const passVal = password.value

        // guard clauses... if authenticating, return
        if (
            isLoading ||
            isAuthenticating ||
            !emailVal ||
            !passVal ||
            passVal.length < 6 ||
            !emailVal.includes('@')
        ) { return }

        // reset error and set isAuthenticating to true
        textError.style.display = 'none'
        isAuthenticating = true
        authBtn.innerText = 'Authenticating...'

        try {
            let data
            if (isRegistration) {
                // register an account
                const response = await fetch(apiBase + 'auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: emailVal, password: passVal })
                })
                data = await response.json()
            } else {
                // login an account
                const response = await fetch(apiBase + 'auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: emailVal, password: passVal })
                })
                data = await response.json()
            }

            if (data.token) {
                token = data.token
                localStorage.setItem('token', token)

                // authenicating into loading
                authBtn.innerText = 'Loading...'

                // fetch todos
                await fetchTodos()

                // show dashboard
                showDashboard()
            } else {
                throw Error('❌ Failed to authenticate...')
            }

        } catch (err) {
            console.log(err.message)
            textError.innerText = err.message
            textError.style.display = 'block'
        } finally {
            authBtn.innerText = 'Submit'
            isAuthenticating = false
        }
    }