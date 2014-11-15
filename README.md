# The Open Dashboard Project

This is an open source personal dashboard written on the [Rails](http://rubyonrails.org) web framework. A working version is hosted by [ZUMH](http://zumh.org) at [dash.zumh.org](http://dash.zumh.org). I hope this project will grow and prosper as time goes on. Also I hope someone finds this somewhat beneficial, besides myself of course.

Created by [Elijah Wilson](http://elijahwilson.me).

## Setup

### Environment Variables
In `config/secrets.yml`
- `DEV_SECRET_KEY_BASE`
- `TEST_SECRET_KEY_BASE`
- `SECRET_KEY_BASE` (_production secret key_)

In `config/production.rb`
- `CDN_BASE` (_for use with AWS CloudFront for example_)
- `FONT_BASE` (_used with the `font_assets` gem, and coincidentally because of CloudFront_)

In `confing/newrelic.yml`
- `NEWRELIC_KEY` (_for use with NewRelic monitoring_)

### Requirements

- Ruby 2.0.0-p594
- Rails 4.1.6
- Postgresql

### Run locally

#### Database Setup

When installing gems you may get an error for `pg` which is the postgresql gem. In order to fix this you need to have postgresql already installed on your machine. On some systems you also may need to install a library to remedy this issue. This is obviously operating system dependant but for example here's what you might do on an ubuntu system:

`sudo apt-get install libpq-dev` then `gem install pg`

Make sure you have a user account for postgresql. If you don't or are not sure, run `sudo -i -u postgres` then `createuser --interactive`, now create a user with the same username you're using to run rails with. After you're done, `quit` and run `bin/rake db:create` and finally `bin/rake db:migrate`.

#### Running Server

To run this locally, clone this repository to wherever you like then run `bin/rake db:migrate`, `bin/rails server`, then head on over to [http://localhost:3000](http://localhost:3000).

_OR_

Use foreman & unicorn as a server to simulate a production environment. Make sure you have those installed and then run `bin/rake db:migrate`, `foreman start`, then head over to [http://localhost:3000](http://localhost:3000).

## TODOs
- add _more, better_ documentation
	- ~~inline~~
	- ~~JavaScript inline~~
	- GitHub wiki
- ~~add tutorials on how to customize your dashboard~~ => http://dash.zumh.org/about/
- Allow adding/removing modules
	- Not more than one of the same
	- Must have at least one on the page
- ~~Manually change location~~ | ~~backend~~ => http://git.io/a8FSMw .. ~~frontend~~ => http://git.io/_5jXMg
- ~~Ability to change color scheme~~ => http://git.io/dIVjaw
	- ~~Default as well as predefined options (color scheme model?)~~
	- ~~Two changeable colors, background & text color~~
	- ~~Allow user to enter any color, hex~~
	- ~~Colorpicker?~~
- Holidays
	- User able to toggle on/off
	- User set type/location of holidays
	- Off/None set by default
	- Changes the color scheme to compliment the holiday
- `create` redirection
	- Using rails `render :js` doesn't feel right
	- Better/more solid solution needed

## JavaScript Order (`dash.min.js`)
- date.min.js
- time.js
- codes.min.js
- weather.js
- news.js
- bootstrap-colorpicker.min.js
- helpers.js
- modernizr.custom.js
- classie.js
- menu.js
- modules.js
- jquery-ui.min.js
- portlets.js
- send.js
- stocks.js
