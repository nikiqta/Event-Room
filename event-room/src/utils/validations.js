export const USERNAME_FIELD_ERROR = 'The username must be between 3 and 20 characters';
export const EMAIL_FIELD_ERROR = 'Please give a valid email';
export const FIRST_NAME_VALIDATION = 'The first name must be between 2 and 20 characters';
export const LAST_NAME_VALIDATION = 'The last name must be between 2 and 20 characters';
export const PASSWORD_VALIDATION = 'The password must be between 3 and 20 characters';
export const REPPASS_PASSWORD_MATCH_ERROR = 'The repeat password must match the given password';
export const REGISTER_CHECK_MESSAGE = 'Please Fill all fields correctly!';
export const LOGIN_CHECK_MESSAGE = 'Please Fill both fields correctly!';
export const EVENT_NAME_ERROR = 'The Event name must be between 3 and 20 characters';
export const TICKET_PRICE_ERROR = 'The ticket price must be in range of 1lv. - 50lv.';
export const AVAILABLE_SEATS_ERROR = 'The available seats must be in range of 10 - 100';
export const IMAGE_URL_ERROR = 'The image url must be valid url';
export const DESCRIPTION_ERROR = 'The description must be between 3 and 300 characters';
export const EVENT_DATE_ERROR = 'The given date should not be in the past!';
export const CREATE_EVENT_CHECK = 'Please Fill all the fields correctly!';

export function eventNameValidation (name, isSubmitted) {
    if (!name && !isSubmitted) return false;
    return name.length < 3 || name.length > 20;
}

export function eventDateValidation (date, isSubmitted) {
    const dateToDate = new Date(date);
    const todaysDate =  new Date(Date.now());

    if (!date && !isSubmitted) return false;
    if(!date && isSubmitted) return true;
    return dateToDate < todaysDate;
}

export function eventTicketPriceValidation (ticketPrice, isSubmitted) {
    if (!ticketPrice && !isSubmitted) return false;
    return ticketPrice < 1 || ticketPrice > 50;
}

export function eventAvailableSeatsValidation (availableSeats, isSubmitted) {
    if (!availableSeats && !isSubmitted) return false;
    return availableSeats < 10 || availableSeats > 100;
}

export function eventImageUrlValidation (imageUrl, isSubmitted) {
    if (!imageUrl && !isSubmitted) return false;
    return !(imageUrl.startsWith('http')  || imageUrl.startsWith('data'));
}

export function eventDescriptionValidation (description, isSubmitted) {
    if (!description && !isSubmitted) return false;
    return description.length < 3 || description.length > 300;
}



export function usernameValidation(username, isSubmitted) {
    if (!username && !isSubmitted) return false;
    return username.length < 3 || username.length > 20;
}

export function emailValidation(email, isSubmitted) {

    const emailPattern = new RegExp(/[^@]+@[^\\.]+\..+/g);

    if (!email && !isSubmitted) return false;
    return !emailPattern.test(email);
}

export function firstNameValidation(firstName, isSubmitted) {
    if (!firstName && !isSubmitted) return false;
    return firstName.length < 2 || firstName.length > 20;
}

export function lastNameValidation(lastName, isSubmitted) {
    if (!lastName && !isSubmitted) return false;
    return lastName.length < 2 || lastName.length > 20;
}

export function passwordValidation(password, isSubmitted) {
    if (!password && !isSubmitted) return false;
    return password.length < 3 || password.length > 20;
}

export function repeatPassValidation(repPass, password, isSubmitted) {
    if (!repPass && !isSubmitted) return false;
    if(!repPass && isSubmitted) return false;
    if(repPass && isSubmitted) return  repPass === password;
    return repPass !== password;
}

/**
 * @return {boolean}
 */
export function registerCheck(data, repPass) {

    return !usernameValidation(data.username, true) &&
        !emailValidation(data.email, true) &&
        !firstNameValidation(data.firstName, true) &&
        !lastNameValidation(data.lastName, true) &&
        !passwordValidation(data.password, true) &&
        repeatPassValidation(repPass, data.password, true);
}

export function loginCheck(username, password) {
   return !usernameValidation(username, true) &&
    !passwordValidation(password, true)
}

export function createCheck(data) {
     return !eventNameValidation(data.name, true) &&
         !eventDateValidation(data.eventDate, true) &&
         !eventTicketPriceValidation(data.ticketPrice, true) &&
         !eventAvailableSeatsValidation(data.availableSeats, true) &&
         !eventImageUrlValidation(data.imageUrl, true) &&
         !eventDescriptionValidation(data.description, true);
}