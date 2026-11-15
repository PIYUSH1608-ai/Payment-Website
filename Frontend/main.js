let container = document.querySelector(".register-form");

const auth_key = '/';


async function send_otp() {
    console.log("HELLO");
    registered_name = document.getElementById("fullname").value.trim();
    registered_email = document.getElementById("email").value.trim();
    sessionStorage.setItem("reg_name", registered_name);
    sessionStorage.setItem("reg_email", registered_email);
    if (!registered_name || !registered_email) {
        alert("Please enter both your full name and email.");
        return;
    }

    try {
        const response = await fetch(auth_key + "auth/send_otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: registered_email })
        });

        if (!response.ok) {
            const result = await response.json().catch(() => ({}));
            alert(result.message || "Failed to send OTP.");
            return;
        }

        container.innerHTML = `
            <h2>Enter OTP</h2>
            <input type="text" id="otp_box" placeholder="XXXXXX">
            <button type="button" class="register-btn" onclick="verify_OTP()">VERIFY</button>
        `;
    } catch (err) {
        console.error(err);
        alert("Network error while sending OTP.");
    }
}

async function verify_OTP() {
    const entered_otp = document.querySelector("#otp_box").value.trim();

    try {
        const registered_email= sessionStorage.getItem("reg_email");

        const response = await fetch(auth_key + "auth/verify_otp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: registered_email, entered_otp: entered_otp })
        });

        if (!response.ok) {
            const result = await response.json().catch(() => ({}));
            alert(result.message || "Invalid OTP.");
            return;
        }

        window.location.href = "/registration/registration2.html";
    } catch (err) {
        console.error(err);
        alert("Network error while verifying OTP.");
    }
}

async function submit_details() {
    const debitcard = document.querySelector("#debitcard").value;
    const accountnumber = document.querySelector("#accountnumber").value;
    const password = document.querySelector("#password").value;
    const registered_name = sessionStorage.getItem("reg_name");
    const registered_email = sessionStorage.getItem("reg_email");
    try {
        const response = await fetch(auth_key + "auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullname: registered_name,
                email: registered_email,
                debit_no: debitcard,
                account_no: accountnumber,
                password: password
            })
        });

        const result = await response.json();
        if (!response.ok) {
            alert(result.message || "Registration failed.");
            return;
        }

        if (result.token) {
            localStorage.setItem("token", result.token);
            window.location.href = "/Dashboard/dashboard.html";
        }
    } catch (err) {
        console.error(err);
        alert("Network error during registration.");
    }
}

async function login() {
    const email = document.querySelector("#login_email").value;
    const password = document.querySelector("#login_password").value;

    try {
        const response = await fetch(auth_key + "auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })
        });

        const result = await response.json();
        if (!response.ok) {
            alert(result.message || "Login failed.");
            return;
        }

        if (result.token) {
            localStorage.setItem("token", result.token);
            window.location.href = "/Dashboard/dashboard.html";
        }
    } catch (err) {
        console.error(err);
        alert("Network error during login.");
    }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/Login/login.html";
}











/////////////////////////////////////////////////////////////////////////

async function getAccountData() {
    
    const token=localStorage.token;
    const profile = document.querySelectorAll(".profile");
    const balance_box = document.querySelector("#balance_box");  
    const response = await fetch(auth_key + "transactions/accountDetails", {
        method: "GET",
        headers: {
            "Authorization": token
            }
        }
    );
    const result = await response.json();
    
    if(!response.ok){
        alert(result.message);
        return;
    }
    
    profile.forEach((item)=>{
        item.innerHTML=result.full_name
    });
    balance_box.innerHTML=result.amount;
}



async function make_payment(){
    const token=localStorage.token;
    const receiver_email = document.querySelector("#email").value;
    const transferred_amount = document.querySelector("#amount").value;
    const password = document.querySelector("#password").value;
    const response = await fetch(auth_key+"transactions/send_money",{
        method: "POST",
        headers: {
            "Authorization": token,
            "Content-Type": "Application/json"
        },
        body: JSON.stringify({receiver_email:receiver_email,transferred_amount:transferred_amount,password:password})
    });
    const result = await response.json();
    if(!response.ok){
        alert(result.message);
        return;
    }else{
        alert(result.message);
        window.location.href = "/Dashboard/dashboard.html";
    }
}



async function getTransactionHistory(){
    const token = localStorage.token;
    const history_list_element = document.querySelector("#history_list");
    const response = await fetch(auth_key+"transactions/history",({
        method: "GET",
        headers: {
            "Authorization": token
        }
    }));
    const result = await response.json();
    if(!response.ok){
        alert(result.message);
        return;
    }
    const transactions = result.history;

    console.log(transactions);
    
    const render_list = `
        ${transactions.map((item)=>(
            `<li>
                <h3>${item.sender_id,item.sender_email}</h3>
                <h3>${item.receiver_id,item.receiver_email}</h3>
                <h2>${item.amount}</h2>
                <p>${item.created_at}</p>
            </li>`
            )).join(" ")}
            `
    history_list.innerHTML=render_list;
}




// Auto-initialize on dashboard.html
document.addEventListener("DOMContentLoaded", () => {
    // Check if on dashboard page
    if (document.querySelector(".dashboard")) {
        getAccountData();
        getTransactionHistory();
    }
});