require 'open-uri'
require 'json'

class DbController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => [:create]

  def new
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
    @uid = gen_uid

    while Db.find_by_uid(@uid) != nil
      @uid = gen_uid
    end

    params[:uid] = @uid

    @db = Db.new(create_db_params)
    @db.stocks = params[:stocks]
    @db.modOrder = params[:modOrder]

    @db.save
    # render json: { uid: @uid }
    render :js => "window.location = '/d/#{@uid}'"
  end

  def about
    @count = Db.count
  end

  def show
  	@db = Db.find_by_uid(params[:uid])
    @db.stocks = create_stocks(@db.stocks)
  end

  def stocks
    q = params[:q]
    results = search_stocks(q)

    render json: results
  end

  private
  	def db_params
  		params.permit(:uid)
  	end

    def create_db_params
      params.permit(:uid, :time, :temp, :stocks, :modOrder)
    end
end

def gen_uid
	o = [('a'..'z'), ('A'..'Z'), (0..9)].map { |i| i.to_a }.flatten
	string = (0..10).map { o[rand(o.length)] }.join

	return string
end

def get_stock_info(symbol)
  url = 'http://dev.markitondemand.com/Api/v2/Quote/json?symbol=' + symbol
  content = open(url).read
  data = JSON.parse(content)

  my_data = Hash.new

  begin
    my_data['success'] = data['Status'] == 'SUCCESS'
  rescue Exception => e
    my_data = get_stock_info("GOOGL")
  end

  if my_data['success']
    my_data['price'] = '%.2f' % data['LastPrice']
    my_data['percent'] = data['ChangePercent'].round(2)
  end

  my_data['name'] = symbol

  return my_data

end

def create_stocks(stocks)
  i = 0
  while (i < stocks.length)
    stocks[i] = get_stock_info(stocks[i])
    i += 1
  end

  return stocks
end

def search_stocks(q)
  search_url = 'http://dev.markitondemand.com/Api/v2/Lookup/json?input=' + q
  search_content = open(search_url).read

  return search_content
end