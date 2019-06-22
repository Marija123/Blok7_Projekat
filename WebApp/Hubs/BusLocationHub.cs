using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Timers;
using System.Web;
using WebApp.Models;

namespace WebApp.Hubs
{
    [HubName("notificationsBus")]
    public class BusLocationHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<BusLocationHub>();

      

        private static List<Station> stations = new List<Station>();

        private static Timer timer = new Timer();
        private static int cnt = 0;

        public BusLocationHub()
        {
        }

        public void TimeServerUpdates()
        {
            if (!timer.Enabled)
            {
                timer.Interval = 5000;
                timer.Start();
                timer.Elapsed += OnTimedEvent;
            }
        }

        private void OnTimedEvent(object source, ElapsedEventArgs e)
        {
            GetTime();
        }

        public void GetTime()
        {
            if (stations.Count > 0)
            {
                if (cnt >= stations.Count)
                {
                    cnt = 0;
                }
                double[] niz = { stations[cnt].Latitude, stations[cnt].Longitude };
                Clients.All.setRealTime(niz);
                cnt++;
            }
        }

        public void StopTimeServerUpdates()
        {
            timer.Stop();
        }

        public void AddStations(List<Station> stationsBM)
        {
            stations = stationsBM;
        }
    }
}