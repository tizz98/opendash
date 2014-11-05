require 'open-uri'
require 'json'

class DbController < ApplicationController
  # create wasn't working without this line
  skip_before_filter :verify_authenticity_token, :only => [:create]

  def new
    # only GET, prefix is new_db
    # Generates a new uid until it is unique and not
    # already in the database. Use the default settings
    # in the database columns for those attributes
    # redirect to the new dashboard via its uid
   	@uid = gen_uid

   	while Db.find_by_uid(@uid) != nil
   		@uid = gen_uid
   	end

   	params[:uid] ||= @uid
   	
   	@db = Db.new(db_params)

   	@db.save
   	redirect_to db_url(@uid)
  end

  def create
    # only POST, prefix is d_create
    # Similar to new however we use the parameters
    # passed in with the POST request to create a new
    # dashboard, then redirect to it with javascript
    # TODO: redirecting via js seems dirty...
    @uid = gen_uid

    while Db.find_by_uid(@uid) != nil
      @uid = gen_uid
    end

    params[:uid] = @uid

    @db = Db.new(create_db_params)
    @db.stocks = params[:stocks]
    @db.modOrder = params[:modOrder]

    @db.save
    render :js => "window.location = '/d/#{@uid}'"
  end

  def about
    # only GET, prefix is about
    # Number of dashboards created shown on the about page
    @count = Db.count
  end

  def show
    # only GET, prefix is db
    # /d/:uid
    # Finds the correct dashboard by uid rather than id
    # then gets the current stock info for the dashboard's stocks
  	@db = Db.find_by_uid(params[:uid])
    @db.stocks = create_stocks(@db.stocks)
  end

  def stocks
    # only GET, prefix is stocks
    # Used for searching for stocks
    # Parsed client-side via jQuery
    q = params[:q]
    results = search_stocks(q)

    render json: results
  end

  private
  	def db_params
      # Used for new
  		params.permit(:uid)
  	end

    def create_db_params
      # Used for create
      params.permit(:uid, :time, :temp, :stocks, :modOrder, :loc, :bg, :fg)
    end
end

def gen_uid
  # Generates a pseudo-random 10 character string to be used as a dashboard's uid
  # 107,518,933,731 unique combinations
	o = [('a'..'z'), ('A'..'Z'), (0..9)].map { |i| i.to_a }.flatten
	string = (0..10).map { o[rand(o.length)] }.join

	return string
end

def get_stock_info(symbol)
  # Gets the current stock information based on the symbol given
  # also checks to see if it was sucessful in getting the stock info
  url = 'http://dev.markitondemand.com/Api/v2/Quote/json?symbol=' + symbol
  content = open(url).read
  data = JSON.parse(content)

  my_data = Hash.new
  my_data['success'] = data['Status'] == 'SUCCESS'

  if my_data['success']
    my_data['price'] = '%.2f' % data['LastPrice']
    my_data['percent'] = data['ChangePercent'].round(2)
  end

  my_data['name'] = symbol.upcase
  return my_data
end

def create_stocks(stocks)
  # Goes through all the stocks in the stocks array
  # a while loop was needed over stocks.each because
  # we are saving the data back to the stocks array
  i = 0
  while (i < stocks.length)
    stocks[i] = get_stock_info(stocks[i])
    i += 1
  end

  return stocks
end

def search_stocks(q)
  # Used for stocks, searches for stocks based on a query
  # returns the raw data to be used in stocks then parsed
  # client-side via jQuery
  search_url = 'http://dev.markitondemand.com/Api/v2/Lookup/json?input=' + q
  search_content = open(search_url).read

  return search_content
end