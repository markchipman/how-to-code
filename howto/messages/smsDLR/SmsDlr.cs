//Download the .net sdk from ap.bandwidth.com/docs/helper-libraries/net

using System;
using System.Threading.Tasks;
using Bandwidth.Net;
using Bandwidth.Net.Api;

public class Program
{
  //API credentials which can be found on your account page at https://catapult.inetwork.com/pages/login.jsf
  private const string UserId = "u-userID"; //{user_id}
  private const string Token = "t-token"; //{token}
  private const string Secret = "secret"; //{secret}

  public static void Main()
  {
    try
    {
      RunAsync().Wait();
    }
    catch (Exception ex)
    {
      Console.Error.WriteLine(ex.Message);
      Environment.ExitCode = 1;
    }
  }

  private static async Task RunAsync()
  {
    var client = new Client(UserId, Token, Secret);

    await client.Message.SendAsync(new MessageData
    {
      From = "+19195551212",
	    To = "+191955512142",
	    Text = "Test",
	    ReceiptRequested = MessageReceiptRequested.All,
	    CallbackUrl = "http://requestb.in"
    });

  }
}