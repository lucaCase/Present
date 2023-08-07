#[macro_use] extern crate rocket;

use std::io;

use rocket::tokio::time::{sleep, Duration};
use rocket::tokio::task::spawn_blocking;

#[get("/hello/<name>/<age>")]
fn hello(name: &str, age: u8) -> String {
    format!("Hello, {} year old named {}!", age, name)
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![hello])
}