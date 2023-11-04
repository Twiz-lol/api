window.onload = function() {
    document.body.innerHTML += `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />
    <style> 
    .notification {
        font-family: 'Satoshi-Font';
    }
    .notification_err {
        font-family: 'Satoshi-Font';
    }
    .notification_warn {
        font-family: 'Satoshi-Font';
    }

    .icon-warn {
        font-size: 20px;
        margin-right: 10px;
        color: #abb526;
        border-radius: 10px;
        padding: 6px;
    }

    .notification_err {
        margin-left: -93px;
        position: fixed;
        top: 2% !Important;
        left: 50%;
        transform: translateX(-50%);
        width: 50%;
        max-width: fit-content;
        border: 2px solid rgb(255 0 0 / 44%);
        background-color: rgb(255 0 0 / 11%);
        color: white;
        border-radius: 10px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Arial, sans-serif;
        backdrop-filter: blur(5px); /* Add a bit of blur to the background */
    }

    .icon-err {
        font-size: 20px;
        margin-right: 10px;
        color: #904545;
        border-radius: 10px;
        padding: 6px;
    }
    .notification_warn {
        margin-left: -93px;
        position: fixed;
        top: 2%;
        left: 50%;
        transform: translateX(-50%);
        width: 40%;
        max-width: fit-content;
        border: 2px solid rgb(251 255 0 / 44%);
        background-color: rgb(254 255 0 / 19%);
        color: white;
        border-radius: 10px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Arial, sans-serif;
        backdrop-filter: blur(5px);
    }

    .notification {
        margin-left: -93px;
        position: fixed;
        top: 2%;
        left: 50%;
        transform: translateX(-50%);
        width: 50%;
        max-width: fit-content;
        border: 2px solid rgb(0 255 0 / 33%);
        background-color: rgb(19 255 29 / 14%);
        color: white;
        border-radius: 10px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Arial, sans-serif;
        backdrop-filter: blur(5px); /* Add a bit of blur to the background */
    }

    .icon {
        font-size: 20px;
        margin-right: 10px;
        color: #529152;
        border-radius: 10px;
        padding: 6px;
    }

    .close-button {
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
        color: #632424fa;
        font-size: 17px;
    }

    .notification:hover .close-button {
        display: block;
    }

    .message {
        font-size: 15px; /* Adjust the font size of the text to make it smaller */
        font-family: 'Satoshi-Font';
        color: #ffffffb5;
        font-size: smaller;
    }</style>`;

}
function fire(error_sucess_warn, message, time) {
    const notifications = document.querySelectorAll('.notification');
    const notifications1 = document.querySelectorAll('.notification_err');
    const notifications2 = document.querySelectorAll('.notification_warn');
    notifications.forEach(notification => {
    notification.remove();
    });
    notifications1.forEach(notification => {
        notification.remove();
        });
    notifications2.forEach(notification => {
            notification.remove();
            });
    if (error_sucess_warn == "error") {
        document.body.innerHTML += `
        <center><div class="notification_err animate__animated animate__slideInDown animate__faster"  id="notification">
        
        <div class="icon-err">
            <i class="fas fa-check-circle"></i>
        </div>
        <div class="message">
            ${message}
        </div>
    </div>`
    }
    if (error_sucess_warn == "success") {
        document.body.innerHTML += `<div class="notification animate__animated animate__slideInDown animate__faster" id="notification">

        <div class="icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <div class="message">
            ${message}
        </div>
    </div>`
    }
    if (error_sucess_warn == "warn") {
        document.body.innerHTML += `<div class="notification_warn animate__animated animate__slideInDown animate__faster" id="notification">
        <!-- <span class="close-button" onclick="closeNotification()"> 
            <i class="fas fa-times"></i>
        </span>-->
        <div class="icon-warn">
            <i class="fas fa-check-circle"></i>
        </div>
        <div class="message">
            ${message}
        </div>
    </div>`
    }
    if (time) {
setTimeout(closeNotification, time); 
    }  else {
setTimeout(closeNotification, 6000); 
        
    }
}

function closeNotification() {
    const notifications = document.querySelectorAll('.notification');
    const notifications1 = document.querySelectorAll('.notification_err');
    const notifications2 = document.querySelectorAll('.notification_warn');
    notifications.forEach(notification => {
    notification.remove();
    });
    notifications1.forEach(notification => {
        notification.remove();
        });
    notifications2.forEach(notification => {
            notification.remove();
            });
}

/*  CopyRight®️ 
Developer twiz.lol/@2 
FrontEnd Developer twiz.lol/@sember
*/