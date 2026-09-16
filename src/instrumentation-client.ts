import posthog from "posthog-js";

const apiKey = process.env.POSTHOG_API_KEY;

if (process.env.NODE_ENV === "production" && apiKey) {
  posthog.init(apiKey, {
    api_host: "/sky-events",
    ui_host: "https://eu.posthog.com",
    defaults: "2026-05-30",
    capture_pageview: "history_change",
    capture_pageleave: true,
    person_profiles: "never",
    autocapture: false,
    disable_session_recording: true,
    disable_surveys: true,
  });
}
