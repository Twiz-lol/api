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
    .notification-stack {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex !Important;
        flex-direction: column-reverse !Important;
        gap: 10px !Important;
        z-index: 9999 !Important;
    }

    .message {
        font-size: 15px; /* Adjust the font size of the text to make it smaller */
        font-family: 'Satoshi-Font';
        font-size: smaller;
    }</style>`;

}
function fire(error_sucess_warn, message, time, icon) {
    const notificationContainer = document.querySelector('.notification-stack');
    if (!notificationContainer) {
        document.body.innerHTML += `<div class="notification-stack"></div>`;
    }

    const notificationTypeClass = {
        error: 'notification_err',
        success: 'notification-success',
        warn: 'notification_warn'
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

    document.querySelector('.notification-stack').appendChild(notificationElement);

    if (time) {
        setTimeout(() => {
            closeNotification(notificationElement);
        }, time); 
    }  else {
        setTimeout(() => {
            closeNotification(notificationElement);
        }, 6000); 
    }
}

function closeNotification(notificationElement) {
    notificationElement.remove();
}
