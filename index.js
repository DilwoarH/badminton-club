document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {

        plugins: [ 'interaction', 'dayGrid', 'list', 'googleCalendar' ],

        defaultView: 'listYear',
        googleCalendarApiKey: 'AIzaSyDq1EgNZrZPf5q2j1L_to86Go4zyOTB53U',
        events: 'qprlaankml2oc9gcn5vu9qiq20@group.calendar.google.com',

        eventClick: function(arg) {
            // opens events in a popup window
            window.open(arg.event.url, 'google-calendar-event', 'width=700,height=600');

            arg.jsEvent.preventDefault() // don't navigate in main tab
        },

        loading: function(bool) {
            document.getElementById('loading').style.display =
            bool ? 'block' : 'none';
        },

        eventSourceSuccess: function(content, xhr) {
            var todaysDate = new Date();
            return content.reduce((data, event) => {
                var endDate = new Date(event.end);
                if (endDate > todaysDate) data.push(event);
                return data;
            }, []);
        },

        eventRender: function(info) {
            var location = document.createElement("small");
            location.style.display = info.event.extendedProps.location ? 'block' : 'none';
            location.style["margin-top"] = "10px";
            location.innerText = info.event.extendedProps.location;
            info.el.querySelector('.fc-list-item-title').appendChild(location);
        }

    });

    calendar.render();
});
