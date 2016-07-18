﻿using System.Configuration;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Vdp
{
    [TestClass]
    public class GetPaymentDataTest : AbstractClient
    {
        private string apikey;

        public GetPaymentDataTest()
        {
            apikey = ConfigurationManager.AppSettings["apiKey"];
        }

        [TestMethod]
        public void TestGetPaymentInfo()
        {
            string baseUri = "wallet-services-web/";
            string resourcePath = "payment/data/{callId}";
            resourcePath = resourcePath.Replace("{callId}", ConfigurationManager.AppSettings["checkoutCallId"]);
            string queryString = "apikey=" + apikey;
            string status = DoXPayTokenCall(baseUri, resourcePath, queryString, "GET", "Get Payment Information Test", "");
            Assert.AreEqual(status, "OK");
        }
    }
}
