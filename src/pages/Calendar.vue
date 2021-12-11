<template>
  <div class="subcontent q-pa-md" style="background-color: #424d5d; height: calc(100vh - 50px)">
    <div class="row justify-center">
      <div class="q-pa-md q-gutter-sm row">
        <q-btn no-caps class="button" style="margin: 2px" @click="onToday">
          Today
        </q-btn>
        <q-btn no-caps class="button" style="margin: 2px" @click="onPrev">
          &lt; Prev
        </q-btn>
        <q-btn no-caps class="button" style="margin: 2px" @click="onNext">
          Next &gt;
        </q-btn>
      </div>
    </div>

    <div class="row justify-center">
      <div style="display: flex; width: 100%">
        <q-calendar-month
          style="border-radius: 10px"
          ref="calendar"
          v-model="selectedDate"
          animated
          bordered
          focusable
          hoverable
          no-active-date
          :day-min-height="100"
          :day-height="0"
          :style="theme"
          @change="onChange"
          @moved="onMoved"
          @click-date="onClickDate"
          @click-day="onClickDay"
          @click-workweek="onClickWorkweek"
          @click-head-workweek="onClickHeadWorkweek"
          @click-head-day="onClickHeadDay"
        >
          <template #day="{ scope: { timestamp } }">
            <template
              v-for="event in eventsMap[timestamp.date]"
              :key="event.id"
            >
              <div
                :class="badgeClasses(event, 'day')"
                :style="badgeStyles(event, 'day')"
                class="my-event"
              >
                <div class="title q-calendar__ellipsis">
                  {{ event.title + (event.time ? " - " + event.time : "") }}
                  <q-tooltip>{{ event.details }}</q-tooltip>
                </div>
              </div>
            </template>
          </template>
        </q-calendar-month>
      </div>
    </div>
  </div>
</template>

<script>
import {
  QCalendarMonth,
  addToDate,
  parseDate,
  parseTimestamp,
  today,
} from "@quasar/quasar-ui-qcalendar/src/index.js";
import "@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass";
import "@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass";
import { defineComponent } from "vue";
// The function below is used to set up our demo data
const CURRENT_DAY = new Date();
function getCurrentDay(day) {
  const newDay = new Date(CURRENT_DAY);
  newDay.setDate(day);
  const tm = parseDate(newDay);
  return tm.date;
}
export default defineComponent({
  name: "MonthSlotDay",
  components: {
    QCalendarMonth,
  },
  data() {
    return {
      selectedDate: today(),
      theme: {
          '--calendar-scrollbar-track': '#4C566A',
          '--calendar-scrollbar-thumb': '#D8DEE9',
          '--calendar-scrollbar-thumb-hover': '#3949ab',
          '--calendar-scrollbar-track-dark': '#4C566A',
          '--calendar-scrollbar-thumb-dark': '#D8DEE9',
          '--calendar-scrollbar-thumb-hover-dark': '#3949ab',
          '--calendar-border': '#4C566A 1px solid',
          '--calendar-border-dark': '#3a4251 1px solid',
          '--calendar-border-section': '#9fa8da 1px dashed',
          '--calendar-border-section-dark': '#9fa8da 1px dashed',
          '--calendar-border-current': '#4C566A 2px solid',
          '--calendar-border-current-dark': '#3d5afe 2px solid',
          '--calendar-mini-range-connector-hover-border': '#027BE3 1px dashed',
          '--calendar-mini-range-connector-hover-border-dark': '#ffff66 1px dashed',
          '--calendar-color': '#D8DEE9',
          '--calendar-color-dark': '#3a4251',
          '--calendar-background': '#3a4251',
          '--calendar-background-dark': '#D8DEE9',
          '--calendar-current-color': '#027BE3',
          '--calendar-current-color-dark': '#3d5afe',
          '--calendar-current-background': '#00000000',
          '--calendar-current-background-dark': '#D8DEE9',
          '--calendar-disabled-date-color': '#3a4251',
          '--calendar-disabled-date-color-dark': '#bebebe',
          '--calendar-disabled-date-background': '#9fa8da',
          '--calendar-disabled-date-background-dark': '#121212',
          '--calendar-active-date-color': '#3a4251',
          '--calendar-active-date-color-dark': '#ffff66',
          '--calendar-active-date-background': '#3d5afe',
          '--calendar-active-date-background-dark': '#4C566A',
          '--calendar-outside-color': '#D8DEE9',
          '--calendar-outside-color-dark': '#bebebe',
          '--calendar-outside-background': '#00000000',
          '--calendar-outside-background-dark': '#121212',
          '--calendar-selected-color': '#027BE3',
          '--calendar-selected-color-dark': '#027BE3',
          '--calendar-selected-background': '#cce7ff',
          '--calendar-selected-background-dark': '#cce7ff',
          '--calendar-mini-selected-color': 'unset',
          '--calendar-mini-selected-color-dark': '#027BE3',
          '--calendar-mini-selected-background': 'unset',
          '--calendar-mini-selected-background-dark': '#cce7ff',
          '--calendar-mini-selected-label-color': '#027BE3',
          '--calendar-mini-selected-label-color-dark': '#cce7ff',
          '--calendar-mini-selected-label-background': '#cce7ff',
          '--calendar-mini-selected-label-background-dark': '#027BE3',
          '--calendar-range-color': '#027BE3',
          '--calendar-range-color-dark': '#027BE3',
          '--calendar-range-background': '#cce7ff',
          '--calendar-range-background-dark': '#cce7ff',
          '--calendar-mini-range-color': '#cce7ff',
          '--calendar-mini-range-color-dark': '#027BE3',
          '--calendar-mini-range-background': 'unset',
          '--calendar-mini-range-background-dark': 'unset',
          '--calendar-mini-range-label-color': '#cce7ff',
          '--calendar-mini-range-label-color-dark': '#027BE3',
          '--calendar-mini-range-label-background': '#cce7ff',
          '--calendar-mini-range-label-background-dark': '#cce7ff',
          '--calendar-mini-range-connector-color': '#cce7ff',
          '--calendar-mini-range-connector-color-dark': '#ffff66',
          '--calendar-mini-range-hover-color': '#027BE3',
          '--calendar-mini-range-hover-color-dark': '#ffff66',
          '--calendar-mini-range-firstlast-color': '#cce7ff',
          '--calendar-mini-range-firstlast-color-dark': '#cce7ff',
          '--calendar-mini-range-firstlast-background': 'unset',
          '--calendar-mini-range-firstlast-background-dark': '#cce7ff',
          '--calendar-mini-range-firstlast-label-color': '#cce7ff',
          '--calendar-mini-range-firstlast-label-color-dark': '#cce7ff',
          '--calendar-mini-range-firstlast-label-background': '#027BE3',
          '--calendar-mini-range-firstlast-label-background-dark': '#ffff66',
          '--calendar-intervals-width': '56px',
          '--calendar-work-week-width': '30px',
          '--calendar-mini-work-week-width': '30px',
          '--calendar-work-week-font-size': '1.0em',
          '--calendar-head-font-weight': '600'
        },
      events: [
        {
          id: 1,
          title: "1st of the Month",
          details:
            "Everything is funny as long as it is happening to someone else",
          date: getCurrentDay(1),
          bgcolor: "orange",
        },
        {
          id: 2,
          title: "Sisters Birthday",
          details: "Buy a nice present",
          date: getCurrentDay(4),
          bgcolor: "green",
          icon: "fas fa-birthday-cake",
        },
        {
          id: 3,
          title: "Meeting",
          details: "Time to pitch my idea to the company",
          date: getCurrentDay(10),
          time: "10:00",
          duration: 120,
          bgcolor: "negative",
          icon: "fas fa-handshake",
        },
        {
          id: 4,
          title: "Lunch",
          details: "Company is paying!",
          date: getCurrentDay(10),
          time: "11:30",
          duration: 90,
          bgcolor: "green",
          icon: "fas fa-hamburger",
        },
        {
          id: 5,
          title: "Visit mom",
          details: "Always a nice chat with mom",
          date: getCurrentDay(20),
          time: "17:00",
          duration: 90,
          bgcolor: "grey",
          icon: "fas fa-car",
        },
        {
          id: 6,
          title: "Conference",
          details: "Teaching Javascript 101",
          date: getCurrentDay(22),
          time: "08:00",
          duration: 540,
          bgcolor: "info",
          icon: "fas fa-chalkboard-teacher",
        },
        {
          id: 7,
          title: "Girlfriend",
          details: "Meet GF for dinner at Swanky Restaurant",
          date: getCurrentDay(22),
          time: "19:00",
          duration: 180,
          bgcolor: "info",
          icon: "fas fa-utensils",
        },
        {
          id: 8,
          title: "Rowing",
          details: "Stay in shape!",
          date: getCurrentDay(27),
          bgcolor: "purple",
          icon: "rowing",
          days: 2,
        },
        {
          id: 9,
          title: "Fishing",
          details: "Time for some weekend R&R",
          date: getCurrentDay(27),
          bgcolor: "purple",
          icon: "fas fa-fish",
          days: 2,
        },
        {
          id: 10,
          title: "Vacation",
          details:
            "Trails and hikes, going camping! Don't forget to bring bear spray!",
          date: getCurrentDay(29),
          bgcolor: "purple",
          icon: "fas fa-plane",
          days: 5,
        },
      ],
    };
  },
  computed: {
    eventsMap() {
      const map = {};
      if (this.events.length > 0) {
        this.events.forEach((event) => {
          (map[event.date] = map[event.date] || []).push(event);
          if (event.days !== undefined) {
            let timestamp = parseTimestamp(event.date);
            let days = event.days;
            // add a new event for each day
            // skip 1st one which would have been done above
            do {
              timestamp = addToDate(timestamp, { day: 1 });
              if (!map[timestamp.date]) {
                map[timestamp.date] = [];
              }
              map[timestamp.date].push(event);
              // already accounted for 1st day
            } while (--days > 1);
          }
        });
      }
      console.log(map);
      return map;
    },
  },
  methods: {
    badgeClasses(event, type) {
      return {
        [`text-white bg-${event.bgcolor}`]: true,
        "rounded-border": true,
      };
    },
    badgeStyles(day, event) {
      const s = {};
      // s.left = day.weekday === 0 ? 0 : (day.weekday * this.parsedCellWidth) + '%'
      // s.top = 0
      // s.bottom = 0
      // s.width = (event.days * this.parsedCellWidth) + '%'
      return s;
    },
    onToday() {
      this.$refs.calendar.moveToToday();
    },
    onPrev() {
      this.$refs.calendar.prev();
    },
    onNext() {
      this.$refs.calendar.next();
    },
    onMoved(data) {
      console.log("onMoved", data);
    },
    onChange(data) {
      console.log("onChange", data);
    },
    onClickDate(data) {
      console.log("onClickDate", data);
    },
    onClickDay(data) {
      console.log("onClickDay", data);
    },
    onClickWorkweek(data) {
      console.log("onClickWorkweek", data);
    },
    onClickHeadDay(data) {
      console.log("onClickHeadDay", data);
    },
    onClickHeadWorkweek(data) {
      console.log("onClickHeadWorkweek", data);
    },
  },
});
</script>

<style lang="sass" scoped>
.my-event
  position: relative
  font-size: 12px
  width: 100%
  margin: 1px 0 0 0
  justify-content: center
  text-overflow: ellipsis
  overflow: hidden
  cursor: pointer
.title
  position: relative
  display: flex
  justify-content: center
  align-items: center
  height: 100%
.text-white
  color: white
.bg-blue
  background: blue
.bg-green
  background: green
.bg-orange
  background: orange
.bg-red
  background: red
.bg-teal
  background: teal
.bg-grey
  background: grey
.bg-purple
  background: purple
.rounded-border
  border-radius: 10px
.button
  background: #4b5769
  color: white
</style>
