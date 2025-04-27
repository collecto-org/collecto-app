export function formatUserToForm(user: any) {
    return {
      username: user.username || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      bio: user.bio || "",
      gender: user.gender || "",
      birthdate: user.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().slice(0, 10)
        : "",
      avatarUrl: user.avatarUrl || "",
      location: user.location || "",
    };
  }
  