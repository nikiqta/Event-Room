# Event-Room
Soft Uni React Project

Event Room
FSD

Register Page

    
1.	Data Models:
User: 
        1.1 username:
	   - min-length: 3
	   - max: length: 20
	   - type: string
	   - required: true
	   - unique
	1.2 password:
	   - min-length: 3
	   - max: length: 20
	   - type: string
	   - required: true
	1.3 salt:
	   - type: string
	   - required: true
	1.4 hashedPassword:
	   - type: string
	   - required: true
	1.5 phoneNumber
           - type: number
           - required: true
        1.6 email
           - type: string
           - required: true	  
        1.7 avatar:
           - type: string
           - required: true	   
Event: 
        1.1 name: 
           - type: string
           - required: true
           - unique
    1.2 date:
           - type: Date
           - required: true
    1.3 participants 
          - type : Array of User ObjectIds
          - ref: User
    1.4 seats
     - type: number
     - min value: 10
     - max value: 1000
     - required: true
    1.5 reservedSeats
     - type Array seatsIds
     - default value: [ ]   
    1.6 host
      - type: ObjectId
	1.7 ticketPrice: 
      - type: number
      - required: true	
    1.8 imageUrl:
      - type: string
      - required: true	
    1.9 description:
      - type: string	  
 
    Comment:
	1.1	relatedEvent
	  - type: ObjectId
	  - ref: Event
	1.2 content
	  - tpe: string
	1.3 creationDate:	 
      - type: Date
	  - default value: Date.now
	1.4 creator:
      - type: objectId
      - ref: User	
	1.5 isEdited:
	  - type: boolean
	  - default value: false	  
	 
	 
	 Ticket: 
	 1.1 name
	  - type objectId
	  - ref: Event
	 1.2 ticketHolder
	  - type: objectId
	  - ref: User
	 1.3 paymentCardNumber:
	  - type: number
	  - required: true
	 
	
2. Navigation:	
	   - Home
	   - Events
	   - My tickets
	   - My events
	   - Create event
	   - Logout
	   - Greetings
	 
3. Register Form:
   - Username: min-length: 3, max: length: 20, type: string, required: true;
   - Email: required: true	 
   - Phone number: required: true, type: number
   - Password: min-length: 3, max: length: 20, type: string
   - Repeat Password: min-length: 3, max: length: 20, type: string
   - Avatar: type: string, required: true

4. Login Form:
   - Username: min-length: 3, max: length: 20, type: string, required: true;
   - Password: min-length: 3, max: length: 20, type: string
   
5. Home Page - Unregister:
   - Shows site logo with only Login and Register Buttons
   - On button click to show the given form 
  
6. Home Page - Authenticated:
  - Homeome page with the three most recently created events
  - Navigation should include: Home, Events, My tickets, My events, Create event, Greetings, logout
  - Search logic for events must be available
  
7. Events Page:
  - Should display all the events available
  - Pagination should be applied
  
8. Details Event:
  - Should display all the info about the given event
  - Get Ticket option
  - Shows comments form
  - Shows all the comments related to the event
  - User is able to edit its own comments
  - User is able to delete own comment only if it is the last created comment
  
9. Get ticket Page:
  - Showshows the seats
  - Showshows prepopulated user data
  - Hasas payment input field
  - On ticket paid to redirect to events
  
10. My tickets page:
  - Shows all the ticket of the given user
  
11. My events page: 
  - Shows all the events of the given user
  - Edit Option must be applied
  - Remove option is applied if there is less than 20% reserved tickets
 
12. Details page for user own event:
  - Edit event form
  - Button Edit
  - Button Cancel
  
13. Create event page:
  - Event form
  - Button Create
  - Button Cancel
