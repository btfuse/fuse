
# Platform

Enum of supported platforms

```typescript
enum Platform {
    IOS,
    ANDROID,
    TEST
}
```

NOTE: `Platform.TEST` is a special platform used in unit test environments. Regular runtimes will not ever be a `Platform.TEST` environment.
