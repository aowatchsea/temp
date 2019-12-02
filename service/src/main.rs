use oasis_std::{Address, Context};

#[derive(oasis_std::Service)]
struct Simstore{
    secret: String,
    admin: Address,
}

type Result<T> = std::result::Result<T, String>;

impl Simstore {
    pub fn new(ctx: &Context, secret: String) -> Self {
        Self{
            secret: secret.to_string(),
            admin: ctx.sender(),
        }
    }

    pub fn store(&mut self, _ctx: &Context, secret: String) -> Result<(String)> {
        self.secret = secret;
        Ok("OK".to_string())
    }

    pub fn fetch(&self, _ctx: &Context) -> &str {
        &self.secret
    }
}

fn main() {
    oasis_std::service!(Simstore);
}

#[cfg(test)]
mod tests {
    extern crate oasis_test;

    use super::*;

    #[test]
    fn test() {
        let sender = oasis_test::create_account(1);
        let ctx = Context::default().with_sender(sender);
        let mut client = Simstore::new(&ctx, "2333".to_string());
        println!("{}", client.fetch(&ctx));
        println!("{:?}", client.store(&ctx, "123".to_string()));
        println!("{}", client.fetch(&ctx));
    }
}
