//Download the .net sdk from ap.bandwidth.com/docs/helper-libraries/net
using System;
using Bandwidth.Net;

public class Program
{
  //API credentials which can be found on your account page at https://catapult.inetwork.com/pages/login.jsf
  private const string UserId = "u-userID";  //{user_id}
  private const string Token = "t-token"; //{token}
  private const string Secret = "secret"; //{secret}

  public static void Main()
  {
    try
    {
      var client = new Client(UserId, Token, Secret);
      foreach (var call in client.Bridge.GetCalls("brg-65dhjbanfdofnqwrmbasiei"))
      {
        Console.WriteLine($"{call.Id}\t{call.From} -> {call.To}");
      }
    }
    catch (Exception ex)
    {
      Console.Error.WriteLine(ex.Message);
      Environment.ExitCode = 1;
    }
  }
}
