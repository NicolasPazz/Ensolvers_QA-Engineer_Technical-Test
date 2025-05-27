# ---------- Task 1: Use Case List ----------

>## UC-01: User Login
> * Actors: Registered User
> * Preconditions: User account with valid credentials must exist
> * Flow:
>    1. The user navigates to the login page
>    2. The user enters a valid username and password
>    3. The user clicks the login button
>    4. The system validates the credentials
>    5. The user is redirected to the main application interface
> * Postconditions: The user is authenticated and a session is started

>## UC-01a: User Login with Invalid Credentials
> * Actors: Registered User
> * Preconditions: Login page is displayed
> * Flow:
>    1. The user enters invalid username or password
>    2. The user clicks login
> * Postconditions: Error message is shown; user is not authenticated

>## UC-01b: Forgot Password with Invalid Email
> * Actors: Registered User
> * Preconditions: Login popup is open
> * Flow:
>    1. The user clicks "Did you forget your password?"
>    2. The user enters an invalid email address and submits
> * Postconditions: Error message is displayed

>## UC-01c: Forgot Password with Valid Email
> * Actors: Registered User
> * Preconditions: Login popup is open
> * Flow:
>    1. The user clicks "Did you forget your password?"
>    2. The user enters a valid email and submits
> * Postconditions: Reset email is sent to the user

>## UC-01d: Save Empty Fields in Settings
> * Actors: Registered User
> * Preconditions: User is on settings page
> * Flow:
>    1. The user clears one required field
>    2. The user clicks save
> * Postconditions: Validation error is displayed

>## UC-01e: Update Profile Successfully
> * Actors: Registered User
> * Preconditions: User is on settings page
> * Flow:
>    1. The user modifies a valid field
>    2. The user clicks save
> * Postconditions: Profile is updated successfully

>## UC-01f: Update Email with Invalid Format
> * Actors: Registered User
> * Preconditions: User is on settings page
> * Flow:
>    1. The user enters an invalid email format
>    2. The user clicks save
> * Postconditions: Error message is shown

>## UC-01g: User Log out
> * Actors: Registered User
> * Preconditions: The user is logged in
> * Flow:
>    1. The user clicks the "Account" menu in the header
>    2. The user selects "Sign out"
>    3. The system ends the user session and redirects to the log out screen
> * Postconditions: The user session is terminated and access to authenticated pages is blocked

>## UC-03a: Create Todo with All Fields
> * Actors: Registered User
> * Preconditions: User is logged in
> * Flow:
>    1. The user completes all required fields
>    2. The user submits the form
> * Postconditions: Todo item is created

>## UC-03b: Create Todo with Incomplete Fields
> * Actors: Registered User
> * Preconditions: User is logged in
> * Flow:
>    1. The user leaves one or more fields empty
>    2. The user submits the form
> * Postconditions: Validation error is shown

>## UC-03c: View Todo Item
> * Actors: Registered User
> * Preconditions: At least one todo exists
> * Flow:
>    1. The user clicks on a todo item
> * Postconditions: Todo details are shown

>## UC-03d: Edit Todo Item
> * Actors: Registered User
> * Preconditions: At least one todo exists
> * Flow:
>    1. The user modifies an existing todo
>    2. The user clicks save
> * Postconditions: Changes are saved

>## UC-03e: Attempt to Edit Todo ID
> * Actors: Registered User
> * Preconditions: At least one todo exists
> * Flow:
>    1. The user tries to change the ID field
>    2. The user saves
> * Postconditions: ID is not modified; error or ignored

>## UC-03f: Clear Description on Edit and Save
> * Actors: Registered User
> * Preconditions: At least one todo exists
> * Flow:
>    1. The user clears the description field
>    2. The user clicks save
> * Postconditions: Validation error is shown

>## UC-03g: Delete Todo Item
> * Actors: Registered User
> * Preconditions: At least one todo exists
> * Flow:
>    1. The user clicks delete on a todo
> * Postconditions: Todo is removed

>## UC-03h: Navigate to Next Page of Todos
> * Actors: Registered User
> * Preconditions: At least 21 todos exist
> * Flow:
>    1. The user clicks to go to the next page
> * Postconditions: Second page of todos is shown

>## UC-07a: Create Folder with Name
> * Actors: Registered User
> * Preconditions: User is logged in
> * Flow:
>    1. The user enters a folder name and submits
> * Postconditions: Folder is created

>## UC-07b: Create Folder Without Name
> * Actors: Registered User
> * Preconditions: User is logged in
> * Flow:
>    1. The user submits folder form with empty name
> * Postconditions: Validation error is shown

>## UC-07c: View Folder
> * Actors: Registered User
> * Preconditions: At least one folder exists
> * Flow:
>    1. The user selects a folder
> * Postconditions: Folder details are shown

>## UC-07d: Edit Folder
> * Actors: Registered User
> * Preconditions: At least one folder exists
> * Flow:
>    1. The user modifies the folder name
>    2. The user saves changes
> * Postconditions: Folder is updated

>## UC-07e: Attempt to Edit Folder ID
> * Actors: Registered User
> * Preconditions: At least one folder exists
> * Flow:
>    1. The user tries to modify the folder ID
>    2. The user saves
> * Postconditions: ID change is rejected or ignored

>## UC-07f: Clear Folder Name on Edit and Save
> * Actors: Registered User
> * Preconditions: At least one folder exists
> * Flow:
>    1. The user clears the name field
>    2. The user saves
> * Postconditions: Validation error is shown

>## UC-07g: Delete Folder
> * Actors: Registered User
> * Preconditions: At least one folder exists
> * Flow:
>    1. The user deletes a folder
> * Postconditions: Folder and its contents are removed

>## UC-07h: Navigate to Next Page of Folders
> * Actors: Registered User
> * Preconditions: At least 21 folders exist
> * Flow:
>    1. The user navigates to the next folder page
> * Postconditions: Second page of folders is shown

>## UC-UX: Header Navigation Verification
> * Actors: Registered User
> * Preconditions: User is logged in
> * Flow:
>    1. The user views the header
>    2. The logo "Ensolvers QA Challenge" is shown on the left
>    3. On the right, user sees buttons: Home, Manage Lists, Account
>    4. Clicking Home navigates to "/"
>    5. Clicking Manage Lists shows: To-Do Items and Folders
>    6. To-Do Items goes to "/to-do-item?page=1&sort=id,asc"
>    7. Folders goes to "/folder"
>    8. Account shows: Settings and Sign out
>    9. Settings goes to "/account/settings", Sign out logs out and redirects to "/logout"
> * Postconditions: All navigations behave as described
---
# ---------- Task 2: Bugs ----------

>### 🐞 Bug Report #1: Todo Item can be saved without description
>
>- **ID:** BUG-TODO-EMPTY-DESCRIPTION  
>- **Title:** System allows saving a todo item with an empty description  
>- **Severity:** Medium  
>- **Component:** Todo Items  
>- **Environment:** https://qa-challenge.ensolvers.com  
>- **Preconditions:**  
>  - User is logged in  
>  - At least one todo item exists  
>- **Steps to Reproduce:**  
>  1. Go to the To-Do Items list  
>  2. Click on an existing todo item to edit it  
>  3. Delete the content of the “Description” field  
>  4. Click **Save**  
>- **Expected Result:**  
>  - A validation error should be shown, preventing the user from saving the form  
>- **Actual Result:**  
>  - The todo item is saved with an empty description  
>- **Impact:**  
>  - Data inconsistency; user can create incomplete items  

>### 🐞 Bug Report #2: Folder can be saved without a name
>
>- **ID:** BUG-FOLDER-EMPTY-NAME  
>- **Title:** System allows editing a folder and saving it without a name  
>- **Severity:** Medium  
>- **Component:** Folders  
>- **Environment:** https://qa-challenge.ensolvers.com  
>- **Preconditions:**  
>  - User is logged in  
>  - At least one folder exists  
>- **Steps to Reproduce:**  
>  1. Go to the Folder list  
>  2. Click on a folder to edit it  
>  3. Clear the content of the “Name” field  
>  4. Click **Save**  
>- **Expected Result:**  
>  - A validation error should be shown for the empty name  
>- **Actual Result:**  
>  - The folder is saved without a name  
>- **Impact:**  
>  - UI/UX issues and identification problems