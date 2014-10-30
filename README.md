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

### Run locally

To run this locally, clone this repository to wherever you like then run `bin/rails server`, then head on over to [http://localhost:3000](http://localhost:3000).

_OR_

Use foreman & unicorn as a server to simulate a production environment. Make sure you have those installed and then run `foreman start`, head over to [http://localhost:3000](http://localhost:3000).

## TODOs
- add _more, better_ documentation
- ~~add tutorials on how to customize your dashboard~~ => http://dash.zumh.org/about/
- Allow adding/removing modules
- Manually change location
- Change color scheme
- Holidays