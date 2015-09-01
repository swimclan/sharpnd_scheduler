# Sharpnd Scheduler

This is an application that takes reservations for the online grooming service Sharpnd.com.  The app allows a user to select a neighborhood they live in, a service they are interested in, takes their information, allows them to log in, select a date and a time for the appointment.

Bundled with the application are two RESTful APIs: one for listing out the current set of appointments and one for the current products and services offered by Sharpnd.

## Installation Instructions

The Sharpnd Scheduler is [reposited on GitHub](https://github.com/swimclan/sharpnd_scheduler).

Here are the steps needed to install the application on your local machine or on a webserver:

1. Clone down the repository from GitHub using: `git clone https://github.com/swimclan/sharpnd_scheduler`

2. Its a Ruby on Rails application so you will need to run the following rake commands

⋅⋅⋅⋅⋅⋅⋅ `rake db:create` <-- Creates the database
⋅⋅⋅⋅⋅⋅⋅ `rake db:migrate` <-- Generates the tables and fields
⋅⋅⋅⋅⋅⋅⋅ `rake db:seed` <-- Inserts the first default API key into the table

- These commands will create the appointments table, the users table and the products table.

3. Install a Cookie on your browser with the default API key (using your favorite cookie editor, I use "EditThisCookie" Chrome extension)
⋅⋅⋅⋅⋅⋅⋅ The cookie key name must be `apiKey` (case sensitive)
⋅⋅⋅⋅⋅⋅⋅ The cookie value must be the default API key `key123`

4. Bundle the gems together to prepare for running the app by executing `bundle` on the terminal shell prompt from within the directory of the application that was cloned

5. Run the Rails app by executing `rails s` on the terminal shell prompt

6. Run the admin page by directing your browser to [http://localhost:3000/admin](http://localhost:3000/admin).

7. Navigate to 'API Keys' 

8. Generate a new API key by clicking the `Generate` button and select `Admin?` checkbox to ensure that this new Key has admin rights.  Click `Save` to finalize the new API key

9. In your browser attach the newly generated key to your browser cookie (again, using EditThisCookie as an example)

10. Refresh the /keys page

11. Delete the default `key123` key by clicking `Delete` next to the default key.  This will ensure that the app is secured.

10. 
