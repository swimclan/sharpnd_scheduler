# Sharpnd Scheduler

This is an application that takes reservations for the online grooming service Sharpnd.com.  The app allows a user to select a neighborhood they live in, a service they are interested in, takes their information, allows them to log in, select a date and a time for the appointment.

Bundled with the application are two RESTful APIs: one for listing out the current set of appointments and one for the current products and services offered by Sharpnd.

## Installation Instructions

The Sharpnd Scheduler is [reposited on GitHub](https://github.com/swimclan/sharpnd_scheduler).

Here are the steps needed to install the application on your local machine or on a webserver:

1. Clone down the repository from GitHub using: `git clone https://github.com/swimclan/sharpnd_scheduler`

2. Its a Ruby on Rails application so you will need to run the following rake commands

-- `rake db:create`
-- `rake db:migrate`

These commands will create the appointments table, the users table and the products table.

3. 
