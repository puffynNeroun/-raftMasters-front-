import emailjs from '@emailjs/browser';

const SERVICE_ID = 'service_q447ow8';
const TEMPLATE_ID = 'template_v77ecls';
const PUBLIC_KEY = 'DxB8MHKYc081yceiG'; // 🔁 замени на свой Public Key

export const sendContactEmail = (formRef) => {
    return emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef, PUBLIC_KEY);
};
