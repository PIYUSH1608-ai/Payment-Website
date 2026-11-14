let container = document.querySelector(".register-form");

const auth_key = '/'

let registered_name = null;
let registered_email = null;

async function send_otp() {
    registered_name = document.getElementById("fullname").value;
    registered_email = document.getElementById("email").value; 
    const response = await fetch(auth_key+"/auth/send_otp", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: json.stringify({email: registered_email})
    })
    const result = await response.json();
    if(!response.ok){
        alert(result.message);
        return;
    }
    container.innerHTML=`
        <h2>Enter OTP</h2>
        <input type="text" id="otp_box" placeholder="XXXXXX">
        <button onclick=verify_OTP>VERIFY</button>
    `
}

async function verify_OTP(){
    const entered_otp = document.querySelector("#otp_box").value;
    const response = await fetch(auth_key+"/auth/verify_otp", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: json.stringify({email: registered_email, entered_otp: entered_otp})
    })
    const result = await response.json();
    if(!response.ok){
        alert(result.message);
        return;
    }
    window.location.href = "./Dashboard/dashboard.html"
}

async function submit_details(){
    const debitcard = document.querySelector("#debitcard").value;
    const accountnumber = document.querySelector("#accountnumber").value;
    const password = document.querySelector("#password").value;

    const response = await fetch(auth_key+"/auth/register",{
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: json.stringify({full_name_:registered_name,email:registered_email,debit_card_no:debitcard,account_no:accountnumber,password:password})
    })
    const result = await response.json();
    if(!response.ok){
        alert(result.message);
        return;
    }
    if(result.token){
        const token = result.token;
        localStorage.setItem("token",token);
    }
    window.location.href = "./Dashboard/dashboard.html"
}