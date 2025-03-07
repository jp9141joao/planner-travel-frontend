import { toast } from "@/hooks/use-toast";

export function getItemSessionStorage<T> (name: string): T | null {
    const jsonValue = sessionStorage.getItem(name);

    if (jsonValue) {
        return JSON.parse(jsonValue) as T;
    }

    return null;
}

export function setItemSessionStorage<T>(name: string, value: T): void {
    sessionStorage.setItem(name, JSON.stringify(value));
}

export function toTitleCase(text: string): string {
    return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

export function getErrorMessages(details: string, at: string): any {
    
    if (details === "VARIABLE NOT PROVIDED") {
        toast({
            variant: 'destructive',
            title: `${toTitleCase(at)} Not Provided`,
            description: `${toTitleCase(at)} was not provided. Please provide an ${at} to continue.`,
        });
    } else if (details === "VARIABLE INVALID") {
        toast({
            variant: 'destructive',
            title: `Invalid ${toTitleCase(at)}`,
            description: `The ${at} you entered is invalid. Please check and try again.`,
        });
    } else if (details === "VARIABLE TOO SHORT") {
        toast({
            variant: 'destructive',
            title: `${toTitleCase(at)} Too Short`,
            description: `Your ${toTitleCase(at)} is too short. Please enter a longer ${at}.`,
        });
    } else if (details === "VARIABLE TOO LONG") {
        toast({
            variant: 'destructive',
            title: `${toTitleCase(at)} Too Long`,
            description: `Your ${toTitleCase(at)} is too long. Please enter a shorter ${at}.`,
        });
    } else if (details === "VARIABLE LESS OR EQUAL THAN ZERO") {
        toast({
            variant: 'destructive',
            title: `${toTitleCase(at)} Less or Equal than Zero`,
            description: `The ${at} you entered is less or equal than zero. Please check and try again.`,
        });
    } else if (details === "EMAIL ALREADY IN USE") {
        toast({
            variant: 'destructive',
            title: 'Email Already in Use',
            description: 'There is already a user using this email. Please use a different email address or log in to your account.',
        });
    } else if (details === "PASSWORD INVALID") {
        toast({
            variant: 'destructive',
            title: 'Invalid Password',
            description: 'Please provide a password that meets the minimum criteria, including at least 8 characters, one uppercase letter, one number, and one special character.',
        });
    } else if (details === "INVALID CREDETIALS") {
        toast({
            variant: 'destructive',
            title: "Invalid Credentials",
            description: "The email or password provided is incorrect.",
        });
    } else if (details === "AMOUNT INVALID FORMAT") {
        toast({
            variant: 'destructive',
            title: 'Invalid Amount Format',
            description: 'The amount must have at most two decimal places. Please enter a valid amount like 10.00 or 5.5.',
        });
    } else {
        throw new Error("The request failed. Please check the data and try again.");
    }
  }
  