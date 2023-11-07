function error(arguments) {
    console.error(arguments);
}
try {
/*  CopyRight®️ 
Developer twiz.lol/@2 
FrontEnd Developer twiz.lol/@sember
*/
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
        position: relative;
        padding: 2%;
        max-width: fit-content; 
        color: white;
        border-radius: 10px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: Arial, sans-serif;
        backdrop-filter: blur(5px);
        margin-bottom: 10px; 
        border: 2px solid rgb(255 0 0 / 44%);
        background-color: rgb(255 0 0 / 11%);
    }

    .icon-error {
        font-size: 20px;
        margin-right: 10px;
        color: #904545;
        border-radius: 10px;
        padding: 6px;
    }
    .notification_warn {
        position: relative;
        padding: 2%;
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
        margin-bottom: 10px; 
    }

    .notification-success {
        position: relative;
        padding: 2%;
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
        backdrop-filter: blur(5px);
        margin-bottom: 10px; 
    }
    
    .icon-success {
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
    /* on top center */
    .notification-stack {
        position: fixed;
        top: 20px;
        left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column-reverse;
    align-items: center;
        gap: 10px !Important;
        z-index: 9999 !Important;
        min-width: 200px;
    max-width: 300px;
    }
    /* on bottom center */
    .notification-stack1 {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex !important;
        flex-direction: column-reverse;
    align-items: center;
        gap: 10px !important;
        z-index: 9999 !important;
        width: fit-content;
        min-width: 200px; 
    max-width: 300px;
    }
    /* on bottom right */
    .notification-stack2 {
        position: fixed;
    bottom: 20px;
    right: 20px;
    display: flex !important;
    flex-direction: column;
            align-items: flex-end;
    gap: 10px !important;
    z-index: 9999 !important;
    width: fit-content;
    min-width: 200px; 
    max-width: 300px;
    }

    .message {
        font-size: 15px; 
        font-family: 'Satoshi-Font';
        font-size: smaller;
    }</style>`;

}
function fire(error_sucess_warn, message, time, icon, position) {
    try {
    const notificationContainer = document.querySelector('.notification-stack');
    const notificationContainer1 = document.querySelector('.notification-stack1');
    const notificationContainer2 = document.querySelector('.notification-stack2');
    if (!notificationContainer || !notificationContainer1 || !notificationContainer2) {
        // console.log(position)
        if (position) {
        if (position == "bottom-center") {
        document.body.innerHTML += `<div class="notification-stack1"></div>`;
    } else if (position == "bottom-right") {
        document.body.innerHTML += `<div class="notification-stack2"></div>`;
    } else {
        document.body.innerHTML += `<div class="notification-stack"></div>`;
    }
} else {
    document.body.innerHTML += `<div class="notification-stack"></div>`;
}
    }

    const notificationTypeClass = {
        error: 'notification_err',
        success: 'notification-success',
        warn: 'notification_warn',
    }[error_sucess_warn];

    const notificationElement = document.createElement('div');
    notificationElement.classList.add(notificationTypeClass, 'animate__animated', 'animate__slideInDown', 'animate__faster');

    const iconElement = document.createElement('div');
    iconElement.classList.add(`icon-${error_sucess_warn}`);
    if (!icon) {
    iconElement.innerHTML = '<i class="fas fa-check-circle"></i>';
    } else iconElement.innerHTML = `${icon}`;
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = message;

    notificationElement.appendChild(iconElement);
    notificationElement.appendChild(messageElement);
    if (position) {
    if (position == "bottom-center") {
    document.querySelector('.notification-stack1').appendChild(notificationElement);
} else if (position == "bottom-right") {
    document.querySelector('.notification-stack2').appendChild(notificationElement);
} else {
    document.querySelector('.notification-stack').appendChild(notificationElement);
}
    } else {
    document.querySelector('.notification-stack').appendChild(notificationElement);
        
    }
    if (time) {
        setTimeout(() => {
            closeNotification(notificationElement);
        }, time); 
    }  else {
        setTimeout(() => {
            closeNotification(notificationElement);
        }, 6000); 
    }
    function closeNotification(notificationElement) {
        notificationElement.remove();
    } 
} catch(e) {
    error("TwastJS: " + "Failed to initialize");
    error("TwastJS:ErrD: " + e.message);
        document.body.innerHTML += `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
        <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
        <style> 
        .notification_error {
            font-family: 'Satoshi-Font';
        }
        .notification_error {
            position: relative;
            padding: 2%;
            max-width: fit-content; 
            color: white;
            border-radius: 10px;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            backdrop-filter: blur(5px);
            margin-bottom: 10px; 
            border: 2px solid rgb(255 0 0 / 44%);
            background-color: rgb(255 0 0 / 11%);
        }
    
        .icon-error {
            font-size: 20px;
            margin-right: 10px;
            color: #904545;
            border-radius: 10px;
            padding: 6px;
        }
    
        .notification:hover .close-button {
            display: block;
        }
        .notification-stack {
            position: fixed;
            top: 20px;
            left: 50%;
                transform: translateX(-50%);
                display: flex;
                flex-direction: column-reverse;
        align-items: center;
            gap: 10px !Important;
            z-index: 9999 !Important;
            min-width: 200px;
        max-width: 300px;
        }
    
        .message {
            font-size: 15px; 
            font-family: 'Satoshi-Font';
            font-size: smaller;
        }</style>`;
    
        const notifications = document.querySelectorAll('.notification-stack');
        notifications.forEach(notification => {
        notification.remove();
        });
            document.body.innerHTML += `<div class="notification-stack"><div class="notification_error animate__animated animate__slideInDown animate__faster"  id="notification">
            
            <div class="icon-error">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="message">
                Failed to initialize TwastJS
            </div>
        </div></div>`
    setTimeout(closeNotification, 6000); 
}
}


} catch(f) {
    error("TwastJS: " + "Failed to initialize");
    warning("TwastJS:ErrD: " + f.message);

    window.onload = function() {
        document.body.innerHTML += `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
        <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
        <style> 
        .notification_err {
            font-family: 'Satoshi-Font';
        }
        .notification_err {
            position: relative;
            padding: 2%;
            max-width: fit-content; 
            color: white;
            border-radius: 10px;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: Arial, sans-serif;
            backdrop-filter: blur(5px);
            margin-bottom: 10px; 
            border: 2px solid rgb(255 0 0 / 44%);
            background-color: rgb(255 0 0 / 11%);
        }
    
        .icon-error {
            font-size: 20px;
            margin-right: 10px;
            color: #904545;
            border-radius: 10px;
            padding: 6px;
        }
    
        .notification:hover .close-button {
            display: block;
        }
        .notification-stack {
            position: fixed;
            top: 20px;
            left: 50%;
                transform: translateX(-50%);
                display: flex;
                flex-direction: column-reverse;
        align-items: center;
            gap: 10px !Important;
            z-index: 9999 !Important;
            min-width: 200px;
        max-width: 300px;
        }
    
        .message {
            font-size: 15px; 
            font-family: 'Satoshi-Font';
            font-size: smaller;
        }</style>`;
    
    }
    function fire(error_sucess_warn, message) {
        const notifications = document.querySelectorAll('.notification-error');
        notifications.forEach(notification => {
        notification.remove();
        });
        if (error_sucess_warn == "error") {
            document.body.innerHTML += `<div class="notification-stack"><div class="notification_error animate__animated animate__slideInDown animate__faster"  id="notification">
            
            <div class="icon-err">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="message">
                ${message}
            </div>
        </div></div>`
        }
    setTimeout(closeNotification, 6000); 
    }
    fire("error","TwastJS Failed to initialize");
}

/*  CopyRight®️ 
Developer twiz.lol/@2 
FrontEnd Developer twiz.lol/@sember
*/